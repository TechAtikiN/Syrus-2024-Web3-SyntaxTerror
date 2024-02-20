import { LucideIcon } from 'lucide-react'
import { useRouter } from 'next/router'
import Link from 'next/link'

interface SidebarItemProps {
  icon: LucideIcon
  label: string
  href: string
}

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const router = useRouter()
  const { pathname } = router

  const isActive = pathname === href

  const onClick = () => {
    router.push(href)
  }

  return (
    <Link
      href={href}
      className={`flex items-center gap-x-2 text-sm font-[500] pl-6 transition-all rounded-xl  hover:text-white cursor-pointer text-white
      
      ${isActive ? "text-primary font-bold" : ""}`}
      onClick={onClick}
    >
      <div className="flex items-center gap-x-2 py-4">
        <Icon size={22} className={`${isActive ? "text-primary font-bold" : ""}`} />
        <span className={`${isActive ? "text-primary font-bold" : ""}`}> {label}</span>
      </div>

    </Link>
  );
};

export default SidebarItem
