import userAvatar from '@/assets/user-avatar.svg'

export default function NavUserBadge() {
  return (
    <div className="p-5 py-3.5 grid grid-rows-2 grid-cols-[auto_1fr] gap-x-3 items-center justify-start cursor-pointer">
      <img src={userAvatar} className="col-start-1 row-span-2" />
      <p className="col-start-2 row-start-1 text-xs text-primary">Steven M.</p>
      <p className="col-start-2 row-start-2 text-xs font-light">Admin</p>
    </div>
  )
}
