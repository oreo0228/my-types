import { Link } from "@/i18n/navigation";

interface DiagnosticCardProps {
  icon: string;
  title: string;
  description: string;
  duration: string;
  minutesLabel: string;
  href: string;
}

export default function DiagnosticCard({
  icon,
  title,
  description,
  duration,
  minutesLabel,
  href,
}: DiagnosticCardProps) {
  return (
    <Link
      href={href}
      className="group block bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 hover:-translate-y-1 transition-all duration-200"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
        {title}
      </h3>
      <p className="text-sm text-gray-500 mb-4 line-clamp-2">{description}</p>
      <span className="inline-block text-xs font-medium text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
        {duration}
        {minutesLabel}
      </span>
    </Link>
  );
}
