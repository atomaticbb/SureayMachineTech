import { readFileSync } from 'fs';
const dir = 'node_modules/.pnpm/@prisma+client@6.19.2_prism_d43f3015e135736aa0f7bb1a98aa3981/node_modules/.prisma/client';
for (const f of ['default.js', 'client.js', 'index.js']) {
  const c = readFileSync(`${dir}/${f}`, 'utf8');
  const hasFollowUp = c.includes('followUp');
  const hasNotes = c.includes('"notes"');
  console.log(`${f} | followUp:${hasFollowUp} | notes:${hasNotes} | size:${c.length}`);
}
const pnpmSchema = readFileSync(`${dir}/schema.prisma`, 'utf8');
console.log('schema followUps:', pnpmSchema.includes('followUps'));
console.log('schema notes:', pnpmSchema.includes('notes'));
