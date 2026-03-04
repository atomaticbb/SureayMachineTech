import { useState, useEffect, useCallback, memo } from "react";
import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  LogOut,
  Search,
  RefreshCcw,
  Mail,
  Phone,
  Building2,
  Paperclip,
  Activity,
  Send,
  Users,
  Eye,
  TrendingUp,
  Inbox,
  ArrowLeft,
  Download,
} from "lucide-react";
import { toast } from "sonner";

// ── Types ──────────────────────────────────────────────────────────────────────

type FollowUpType    = "Email" | "Call" | "Internal";
type ContactStatus   = "pending" | "replied" | "closed";

interface FollowUp {
  id:        string;
  content:   string;
  type:      FollowUpType;
  author:    string;
  createdAt: string;
}

interface Contact {
  id:             string;
  name:           string;
  email:          string;
  phone?:         string;
  company?:       string;
  message:        string;
  inquiryType?:   string;
  attachmentName?: string;
  attachmentSize?: number;
  status:         ContactStatus;
  createdAt:      string;
  updatedAt:      string;
  followUps:      FollowUp[];
}

interface Statistics {
  contacts:  { total: number; pending: number };
  analytics: { pageViews: number; uniqueVisitors: number };
  popularPages: Array<{ page: string | null; views: number }>;
}

// ── Domain constants ───────────────────────────────────────────────────────────

const FOLLOWUP_META: Record<FollowUpType, { label: string; cls: string }> = {
  Email:    { label: "邮件",   cls: "bg-blue-600 text-white" },
  Call:     { label: "电话",   cls: "bg-emerald-600 text-white" },
  Internal: { label: "内部",   cls: "bg-slate-500 text-white" },
};

const STATUS_META: Record<ContactStatus, { label: string; cls: string }> = {
  pending: { label: "待处理", cls: "bg-amber-500 text-black" },
  replied: { label: "已回复", cls: "bg-blue-600 text-white" },
  closed:  { label: "已归档", cls: "bg-slate-500 text-white" },
};

const INQUIRY_DISPLAY: Record<string, string> = {
  custom_oem:    "定制OEM",
  standard_part: "标准件",
  technical:     "技术支持",
};

function fmtInquiry(t?: string) {
  if (!t) return null;
  return INQUIRY_DISPLAY[t] ?? t;
}

function fmtBytes(b?: number) {
  if (!b) return "";
  return b < 1024 ? `${b} B` : `${(b / 1024).toFixed(1)} KB`;
}

function fmtDate(s: string) {
  return new Date(s).toLocaleString("zh-CN", {
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
}

function fmtShort(s: string) {
  return new Date(s).toLocaleString("zh-CN", {
    month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", hour12: false,
  });
}

// ── CSV export utility ────────────────────────────────────────────────────────

function exportToCSV(contacts: Contact[]) {
  const BOM = "\uFEFF"; // UTF-8 BOM — Excel 正确渲染中文字符必需

  const esc = (v: string | undefined | null): string => {
    if (v == null || v === "") return '""';
    return `"${String(v).replace(/"/g, '""')}"`;
  };

  const headers = ["姓名", "邮箱", "公司", "询盘类型", "内容", "状态", "提交时间"];

  const rows = contacts.map((c) => [
    esc(c.name),
    esc(c.email),
    esc(c.company),
    esc(c.inquiryType),
    esc(c.message),
    esc(c.status),
    esc(new Date(c.createdAt).toLocaleString("zh-CN", { hour12: false })),
  ].join(","));

  const csv = BOM + [headers.map((h) => `"${h}"`).join(","), ...rows].join("\r\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `sureay-询盘报表-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Sub-components ─────────────────────────────────────────────────────────────

const ContactRow = memo(function ContactRow({
  contact,
  selected,
  onClick,
}: {
  contact:  Contact;
  selected: boolean;
  onClick:  () => void;
}) {
  const sm = STATUS_META[contact.status] ?? STATUS_META.pending;
  const iq = fmtInquiry(contact.inquiryType);

  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full text-left px-4 py-3 border-b border-border transition-colors",
        selected
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted/40",
      )}
    >
      {/* Row 1: name + status */}
      <div className="flex items-center justify-between gap-2 mb-0.5">
        <span className="font-bold text-sm truncate leading-tight">
          {contact.name}
        </span>
        <span
          className={cn(
            "shrink-0 text-[10px] font-black tracking-wider px-1.5 py-0.5",
            sm.cls,
          )}
        >
          {sm.label}
        </span>
      </div>

      {/* Row 2: company */}
      {contact.company && (
        <div className={cn(
          "text-xs truncate mb-0.5",
          selected ? "text-primary-foreground/70" : "text-muted-foreground",
        )}>
          {contact.company}
        </div>
      )}

      {/* Row 3: inquiry type + follow-up count + date */}
      <div className="flex items-center justify-between gap-2 mt-1">
        {iq ? (
          <span className={cn(
            "text-[10px] font-semibold tracking-wide px-1.5 py-0.5 border",
            selected
              ? "border-primary-foreground/30 text-primary-foreground/80"
              : "border-border text-muted-foreground",
          )}>
            {iq}
          </span>
        ) : <span />}

        <div className={cn(
          "flex items-center gap-2 text-[10px] font-mono shrink-0",
          selected ? "text-primary-foreground/60" : "text-muted-foreground",
        )}>
          {contact.followUps.length > 0 && (
            <span className="flex items-center gap-0.5">
              <Activity className="h-2.5 w-2.5" />
              {contact.followUps.length}
            </span>
          )}
          <span>{fmtShort(contact.createdAt)}</span>
        </div>
      </div>
    </button>
  );
});

// ── Detail skeleton ────────────────────────────────────────────────────────────

function DetailSkeleton() {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-48" />
          <Skeleton className="h-4 w-32" />
        </div>
        <Skeleton className="h-px w-full" />
        <div className="space-y-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-64" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="h-px w-full" />
        <div className="space-y-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-24 w-full" />
        </div>
        <Skeleton className="h-px w-full" />
        <div className="space-y-3">
          <Skeleton className="h-3 w-32" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
      <div className="shrink-0 border-t p-4 space-y-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-16 w-full" />
        <Skeleton className="h-9 w-32" />
      </div>
    </div>
  );
}

// ── Detail empty state ─────────────────────────────────────────────────────────

function DetailEmpty() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center text-muted-foreground select-none">
      <Inbox className="h-12 w-12 mb-4 opacity-20" />
      <p className="text-xs font-black tracking-[0.3em] opacity-40">
        请选择一条询盘
      </p>
    </div>
  );
}

// ── Detail view ────────────────────────────────────────────────────────────────

function DetailView({
  contact,
  onBack,
  onStatusChange,
  onFollowUpAdded,
}: {
  contact:         Contact;
  onBack:          () => void;
  onStatusChange:  (id: string, status: string) => Promise<void>;
  onFollowUpAdded: (id: string, content: string, type: FollowUpType, status?: string) => Promise<void>;
}) {
  const [fuContent,  setFuContent]  = useState("");
  const [fuType,     setFuType]     = useState<FollowUpType>("Internal");
  const [fuStatus,   setFuStatus]   = useState<string>("—");
  const [submitting, setSubmitting] = useState(false);

  // Reset form when contact changes
  useEffect(() => {
    setFuContent("");
    setFuType("Internal");
    setFuStatus("—");
  }, [contact.id]);

  const handleSubmit = async () => {
    if (!fuContent.trim()) return;
    setSubmitting(true);
    try {
      await onFollowUpAdded(
        contact.id,
        fuContent,
        fuType,
        fuStatus !== "—" ? fuStatus : undefined,
      );
      setFuContent("");
      setFuStatus("—");
    } finally {
      setSubmitting(false);
    }
  };

  const sm = STATUS_META[contact.status] ?? STATUS_META.pending;
  const iq = fmtInquiry(contact.inquiryType);

  // ── Sort timeline newest-first ──
  const sortedFollowUps = [...contact.followUps].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <div className="flex flex-col flex-1 min-h-0">

      {/* Detail header */}
      <div className="shrink-0 border-b px-4 md:px-6 py-4 bg-primary text-primary-foreground">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3 min-w-0">
            {/* Mobile back button */}
            <button
              onClick={onBack}
              className="md:hidden shrink-0 mt-0.5 p-1 -ml-1 rounded hover:bg-primary-foreground/10 transition-colors"
              aria-label="返回列表"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="min-w-0">
              <h2 className="text-xl font-black tracking-tight truncate leading-tight">
                {contact.name}
              </h2>
              {contact.company && (
                <p className="text-sm text-primary-foreground/70 font-mono mt-0.5 truncate">
                  {contact.company}
                </p>
              )}
            </div>
          </div>
          <span className={cn(
            "shrink-0 text-xs font-black tracking-widest px-2 py-1",
            sm.cls,
          )}>
            {sm.label}
          </span>
        </div>
      </div>

      {/* Scrollable content */}
      <ScrollArea className="flex-1 min-h-0">
        <div className="px-4 md:px-6 py-5 space-y-6">

          {/* ── 客户档案 ── */}
          <section>
            <p className="text-[10px] font-black tracking-[0.25em] text-muted-foreground uppercase mb-3">
              客户档案
            </p>
            <div className="space-y-2">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-sm hover:text-primary transition-colors group"
              >
                <Mail className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary" />
                <span className="font-mono truncate">{contact.email}</span>
              </a>

              {contact.phone && (
                <a
                  href={`tel:${contact.phone}`}
                  className="flex items-center gap-3 text-sm hover:text-primary transition-colors group"
                >
                  <Phone className="h-4 w-4 text-muted-foreground shrink-0 group-hover:text-primary" />
                  <span className="font-mono">{contact.phone}</span>
                </a>
              )}

              {contact.company && (
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Building2 className="h-4 w-4 shrink-0" />
                  <span>{contact.company}</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-1 flex-wrap">
                {iq && (
                  <span className="text-[10px] font-black tracking-widest border border-border px-2 py-0.5 text-muted-foreground">
                    {iq}
                  </span>
                )}
                <span className="text-[10px] font-mono text-muted-foreground">
                  提交于 {fmtDate(contact.createdAt)}
                </span>
              </div>
            </div>
          </section>

          <Separator />

          {/* ── 询盘内容 ── */}
          <section>
            <p className="text-[10px] font-black tracking-[0.25em] text-muted-foreground uppercase mb-3">
              询盘内容
            </p>
            <div className="border-l-4 border-primary bg-muted/30 px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap text-foreground">
              {contact.message}
            </div>
          </section>

          {/* ── 技术图纸 ── */}
          {contact.attachmentName && (
            <>
              <Separator />
              <section>
                <p className="text-[10px] font-black tracking-[0.25em] text-muted-foreground uppercase mb-3">
                  技术图纸
                </p>
                <div className="border border-border bg-muted/20 p-4 flex items-start gap-4">
                  <div className="shrink-0 bg-primary/10 p-2">
                    <Paperclip className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-mono font-bold text-foreground truncate">
                      {contact.attachmentName}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">
                      {fmtBytes(contact.attachmentSize)}
                      {contact.attachmentSize ? " · " : ""}
                      {contact.attachmentName.split(".").pop()?.toUpperCase()}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-1.5 leading-snug">
                      已通过邮件发送 · 不存储于服务器
                    </p>
                  </div>
                </div>
              </section>
            </>
          )}

          <Separator />

          {/* ── 跟进时间轴（最新在上）── */}
          <section>
            <p className="text-[10px] font-black tracking-[0.25em] text-muted-foreground uppercase mb-3">
              跟进时间轴
              {sortedFollowUps.length > 0 && (
                <span className="ml-2 normal-case font-normal">
                  ({sortedFollowUps.length})
                </span>
              )}
            </p>

            {sortedFollowUps.length === 0 ? (
              <p className="text-xs text-muted-foreground italic">
                暂无跟进记录。
              </p>
            ) : (
              <div className="relative">
                {/* Vertical rail */}
                <div className="absolute left-[7px] top-2 bottom-2 w-px bg-border" />

                <div className="space-y-4">
                  {sortedFollowUps.map((fu) => {
                    const meta = FOLLOWUP_META[fu.type] ?? FOLLOWUP_META.Internal;
                    return (
                      <div key={fu.id} className="flex gap-4 pl-1">
                        {/* Timeline dot */}
                        <div className="shrink-0 mt-1 relative z-10">
                          <div className="h-3.5 w-3.5 bg-primary border-2 border-background" />
                        </div>

                        <div className="min-w-0 flex-1 pb-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span className={cn(
                              "text-[9px] font-black tracking-widest px-1.5 py-0.5",
                              meta.cls,
                            )}>
                              {meta.label}
                            </span>
                            <span className="text-[10px] font-semibold text-foreground">
                              {fu.author}
                            </span>
                            <span className="text-[10px] font-mono text-muted-foreground">
                              {fmtShort(fu.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                            {fu.content}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </section>

          {/* bottom padding */}
          <div className="h-2" />
        </div>
      </ScrollArea>

      {/* ── 添加跟进记录（底部固定）── */}
      <div className="shrink-0 border-t bg-background p-4 space-y-3">
        <p className="text-[10px] font-black tracking-[0.25em] text-muted-foreground uppercase">
          添加跟进记录
        </p>

        <Textarea
          placeholder="添加跟进记录 — 通话结果、邮件摘要、内部备注..."
          value={fuContent}
          onChange={(e) => setFuContent(e.target.value)}
          rows={3}
          className="resize-none text-sm font-mono"
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        <div className="flex items-center gap-2 flex-wrap">
          {/* Activity type */}
          <Select
            value={fuType}
            onValueChange={(v) => setFuType(v as FollowUpType)}
          >
            <SelectTrigger className="w-[120px] h-8 text-xs font-mono">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Internal">内部备注</SelectItem>
              <SelectItem value="Email">邮件沟通</SelectItem>
              <SelectItem value="Call">电话沟通</SelectItem>
            </SelectContent>
          </Select>

          {/* Optional status transition */}
          <Select value={fuStatus} onValueChange={setFuStatus}>
            <SelectTrigger className="w-[140px] h-8 text-xs font-mono">
              <SelectValue placeholder="保持状态不变" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="—">保持状态不变</SelectItem>
              <SelectItem value="pending">→ 待处理</SelectItem>
              <SelectItem value="replied">→ 已回复</SelectItem>
              <SelectItem value="closed">→ 已归档</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex-1" />

          <span className="text-[10px] text-muted-foreground font-mono hidden sm:block">
            ⌘↵ 提交
          </span>

          <Button
            size="sm"
            onClick={handleSubmit}
            disabled={submitting || !fuContent.trim()}
            className="h-8 text-xs font-black tracking-wider uppercase gap-2"
          >
            <Send className="h-3 w-3" />
            {submitting ? "提交中..." : "添加跟进"}
          </Button>
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export default function Admin() {
  const [, setLocation]   = useLocation();
  const [activeTab, setActiveTab] = useState<"contacts" | "analytics">("contacts");

  // Data
  const [contacts,   setContacts]   = useState<Contact[]>([]);
  const [analytics,  setAnalytics]  = useState<{
    id: string; eventType: string; page: string | null;
    ipAddress: string | null; userAgent: string | null; createdAt: string;
  }[]>([]);
  const [statistics, setStatistics] = useState<Statistics | null>(null);

  // UI state
  const [loading,      setLoading]      = useState(false);
  const [loadingMore,  setLoadingMore]  = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm,   setSearchTerm]   = useState("");
  const [selectedId,   setSelectedId]   = useState<string | null>(null);
  const [page,         setPage]         = useState(1);
  const [hasMore,      setHasMore]      = useState(false);

  const selectedContact = contacts.find(c => c.id === selectedId) ?? null;

  // ── Fetchers ────────────────────────────────────────────────────────────────

  const fetchStatistics = useCallback(async () => {
    try {
      const res  = await fetch("/api/admin/statistics?days=7", { credentials: "include" });
      const data = await res.json();
      if (data.success) setStatistics(data.data);
    } catch {
      /* non-fatal */
    }
  }, []);

  const fetchContacts = useCallback(async (pageArg = 1) => {
    const isFirstPage = pageArg === 1;
    if (isFirstPage) setLoading(true);
    else setLoadingMore(true);

    try {
      const params = new URLSearchParams({
        page:  String(pageArg),
        limit: "50",
        ...(statusFilter !== "all" && { status: statusFilter }),
        ...(searchTerm && { search: searchTerm }),
      });
      const res  = await fetch(`/api/admin/contacts?${params}`, { credentials: "include" });
      const data = await res.json();

      if (data.success) {
        const incoming: Contact[] = data.data.contacts;
        const pagination          = data.data.pagination;

        if (isFirstPage) {
          setContacts(incoming);
        } else {
          setContacts(prev => [...prev, ...incoming]);
        }

        setHasMore(pagination.page < pagination.totalPages);
        setPage(pageArg);
      }
    } catch {
      toast.error("询盘数据加载失败");
    } finally {
      if (isFirstPage) setLoading(false);
      else setLoadingMore(false);
    }
  }, [statusFilter, searchTerm]);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res  = await fetch("/api/admin/analytics?limit=100", { credentials: "include" });
      const data = await res.json();
      if (data.success) setAnalytics(data.data.analytics);
    } catch {
      toast.error("流量数据加载失败");
    } finally {
      setLoading(false);
    }
  }, []);

  const handleStatusChange = useCallback(async (id: string, status: string) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ status }),
      });
      const data = await res.json();
      if (data.success) {
        setContacts(prev =>
          prev.map(c => c.id === id ? { ...c, status: status as ContactStatus } : c)
        );
        toast.success("状态已更新");
      }
    } catch {
      toast.error("状态更新失败");
    }
  }, []);

  const handleFollowUpAdded = useCallback(async (
    id: string,
    content: string,
    type: FollowUpType,
    status?: string,
  ) => {
    try {
      const res = await fetch(`/api/admin/contacts/${id}/followups`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ content, type, ...(status && { status }) }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message ?? "未知错误");

      const newFu: FollowUp = data.data;
      setContacts(prev =>
        prev.map(c =>
          c.id === id
            ? {
                ...c,
                followUps: [...c.followUps, newFu],
                ...(status ? { status: status as ContactStatus } : {}),
              }
            : c
        )
      );
      toast.success("跟进记录已添加");
    } catch (err) {
      const msg = err instanceof Error ? err.message : "跟进记录添加失败";
      toast.error(msg);
      throw err; // re-throw so DetailView can reset submitting state
    }
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    setLocation("/admin/login");
  };

  // ── Effects ─────────────────────────────────────────────────────────────────

  useEffect(() => { fetchStatistics(); }, [fetchStatistics]);

  useEffect(() => {
    if (activeTab === "contacts") fetchContacts();
    else                          fetchAnalytics();
  }, [activeTab, fetchContacts, fetchAnalytics]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setPage(1);
    setHasMore(false);
  }, [statusFilter, searchTerm]);

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-background">

      {/* ── Command Bar (main header) ── */}
      <div className="shrink-0 bg-primary text-primary-foreground border-b border-primary/80 px-4 md:px-6 py-3 flex items-center gap-4 md:gap-6">

        {/* Branding */}
        <div className="font-black tracking-widest text-lg mr-6 shrink-0">
          SUREAY <span className="text-primary-foreground/50">OS</span>
        </div>

        {statistics && (
          <>
            <div className="flex items-center gap-2 text-sm">
              <Users className="h-3.5 w-3.5 opacity-60" />
              <span className="font-black">{statistics.contacts.total}</span>
              <span className="text-primary-foreground/60 text-xs">条询盘</span>
              <span className="font-black text-amber-400 ml-1">
                {statistics.contacts.pending}
              </span>
              <span className="text-primary-foreground/60 text-xs">条待处理</span>
            </div>

            <div className="w-px h-4 bg-primary-foreground/20 hidden sm:block" />

            <div className="hidden sm:flex items-center gap-2 text-sm">
              <Eye className="h-3.5 w-3.5 opacity-60" />
              <span className="font-black">{statistics.analytics.pageViews}</span>
              <span className="text-primary-foreground/60 text-xs">次浏览</span>
              <span className="font-black text-emerald-400 ml-1">
                {statistics.analytics.uniqueVisitors}
              </span>
              <span className="text-primary-foreground/60 text-xs">位访客</span>
            </div>

            {statistics.popularPages[0]?.page && (
              <>
                <div className="w-px h-4 bg-primary-foreground/20" />
                <div className="hidden md:flex items-center gap-2 text-sm min-w-0">
                  <TrendingUp className="h-3.5 w-3.5 opacity-60 shrink-0" />
                  <span className="font-mono text-xs text-primary-foreground/70 truncate max-w-[200px]">
                    {statistics.popularPages[0].page}
                  </span>
                  <span className="text-primary-foreground/60 text-xs shrink-0">
                    热门页面
                  </span>
                </div>
              </>
            )}
          </>
        )}

        <div className="ml-auto flex items-center gap-2">
          {/* Tab switcher */}
          <div className="flex border border-primary-foreground/30">
            <button
              onClick={() => setActiveTab("contacts")}
              className={cn(
                "px-3 py-1 text-xs font-black tracking-wider transition-colors",
                activeTab === "contacts"
                  ? "bg-primary-foreground text-primary"
                  : "text-primary-foreground/70 hover:text-primary-foreground",
              )}
            >
              询盘大厅
            </button>
            <button
              onClick={() => setActiveTab("analytics")}
              className={cn(
                "px-3 py-1 text-xs font-black tracking-wider border-l border-primary-foreground/30 transition-colors",
                activeTab === "analytics"
                  ? "bg-primary-foreground text-primary"
                  : "text-primary-foreground/70 hover:text-primary-foreground",
              )}
            >
              流量监控
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-primary-foreground/70 hover:text-primary-foreground transition-colors ml-2"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="hidden sm:inline font-medium">退出</span>
          </button>
        </div>
      </div>

      {/* ── Main content area ── */}
      <div className="flex flex-col flex-1 min-h-0">

        {/* ── 询盘大厅：主从布局 ── */}
        {activeTab === "contacts" && (
          <div className="flex flex-1 min-h-0 overflow-hidden">

            {/* LEFT PANE — inquiry list (hidden on mobile when a contact is selected) */}
            <div className={cn(
              "w-full md:w-80 shrink-0 border-r flex flex-col min-h-0",
              selectedId ? "hidden md:flex" : "flex",
            )}>

              {/* List filter bar */}
              <div className="shrink-0 border-b p-3 flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    placeholder="搜索客户姓名/公司..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 h-8 text-xs font-mono"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[90px] h-8 text-xs font-mono">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">全部</SelectItem>
                    <SelectItem value="pending">待处理</SelectItem>
                    <SelectItem value="replied">已回复</SelectItem>
                    <SelectItem value="closed">已归档</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => fetchContacts(1)}
                  disabled={loading}
                  title="刷新"
                >
                  <RefreshCcw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => exportToCSV(contacts)}
                  disabled={contacts.length === 0}
                  title="导出报表 (CSV)"
                >
                  <Download className="h-3.5 w-3.5" />
                </Button>
              </div>

              {/* List body */}
              <div className="flex-1 overflow-y-auto">
                {loading ? (
                  <div className="p-3 space-y-3">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-48" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    ))}
                  </div>
                ) : contacts.length === 0 ? (
                  <div className="p-6 text-center text-xs text-muted-foreground tracking-widest">
                    暂无询盘记录
                  </div>
                ) : (
                  <>
                    {contacts.map((c) => (
                      <ContactRow
                        key={c.id}
                        contact={c}
                        selected={c.id === selectedId}
                        onClick={() => setSelectedId(c.id)}
                      />
                    ))}

                    {/* 加载更多 */}
                    {hasMore && (
                      <div className="p-3 border-t">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full h-8 text-xs font-black tracking-wider"
                          onClick={() => fetchContacts(page + 1)}
                          disabled={loadingMore}
                        >
                          {loadingMore ? (
                            <>
                              <RefreshCcw className="h-3 w-3 mr-1.5 animate-spin" />
                              加载中...
                            </>
                          ) : (
                            "加载更多"
                          )}
                        </Button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* RIGHT PANE — detail (hidden on mobile when no contact selected) */}
            <div className={cn(
              "flex-1 flex flex-col min-h-0",
              selectedId ? "flex" : "hidden md:flex",
            )}>
              {loading && !selectedContact ? (
                <DetailSkeleton />
              ) : selectedContact ? (
                <DetailView
                  key={selectedContact.id}
                  contact={selectedContact}
                  onBack={() => setSelectedId(null)}
                  onStatusChange={handleStatusChange}
                  onFollowUpAdded={handleFollowUpAdded}
                />
              ) : (
                <DetailEmpty />
              )}
            </div>
          </div>
        )}

        {/* ── 流量监控 ── */}
        {activeTab === "analytics" && (
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 max-w-6xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-sm font-black tracking-[0.2em] uppercase text-muted-foreground">
                  页面访问日志
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchAnalytics}
                  disabled={loading}
                  className="h-8 gap-2 text-xs"
                >
                  <RefreshCcw className={cn("h-3.5 w-3.5", loading && "animate-spin")} />
                  刷新
                </Button>
              </div>

              {loading ? (
                <div className="space-y-3">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <Skeleton key={i} className="h-10 w-full" />
                  ))}
                </div>
              ) : analytics.length === 0 ? (
                <p className="text-muted-foreground text-sm text-center py-12">
                  暂无访问数据
                </p>
              ) : (
                <div className="border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-muted/30">
                        <TableHead className="text-[10px] font-black tracking-widest uppercase">事件</TableHead>
                        <TableHead className="text-[10px] font-black tracking-widest uppercase">页面</TableHead>
                        <TableHead className="text-[10px] font-black tracking-widest uppercase">IP 地址</TableHead>
                        <TableHead className="text-[10px] font-black tracking-widest uppercase hidden lg:table-cell">用户代理</TableHead>
                        <TableHead className="text-[10px] font-black tracking-widest uppercase">时间</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {analytics.map((r) => (
                        <TableRow key={r.id} className="text-xs">
                          <TableCell>
                            <span className="font-mono font-bold text-xs border border-border px-1.5 py-0.5">
                              {r.eventType}
                            </span>
                          </TableCell>
                          <TableCell className="font-mono max-w-[200px] truncate">
                            {r.page ?? "—"}
                          </TableCell>
                          <TableCell className="font-mono text-muted-foreground">
                            {r.ipAddress ?? "—"}
                          </TableCell>
                          <TableCell className="max-w-xs truncate text-muted-foreground hidden lg:table-cell">
                            {r.userAgent ?? "—"}
                          </TableCell>
                          <TableCell className="font-mono text-muted-foreground whitespace-nowrap">
                            {fmtShort(r.createdAt)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
