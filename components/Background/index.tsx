export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

      <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-cyan-400 opacity-30 blur-[120px] rounded-full" />

      <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-blue-500 opacity-30 blur-[120px] rounded-full" />

    </div>
  )
}