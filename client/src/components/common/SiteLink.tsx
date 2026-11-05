import { Link, type LinkProps } from "wouter";

/** English-only pages must leave the language router and reload its context. */
export default function SiteLink(props: LinkProps) {
  const destination = props.href ?? props.to;
  if (
    !destination ||
    !/^\/(?:news(?:\/|$|[?#])|privacy-policy(?:$|[?#])|terms(?:$|[?#]))/.test(
      destination
    )
  ) {
    return <Link {...props} />;
  }

  return (
    <Link
      {...props}
      to={undefined}
      href={`~${destination}`}
      onClick={event => {
        props.onClick?.(event);
        if (!event.defaultPrevented) {
          event.preventDefault();
          window.location.assign(destination);
        }
      }}
    />
  );
}
