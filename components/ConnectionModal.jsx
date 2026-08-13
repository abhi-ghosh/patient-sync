export default function ConnectionModal({seconds}) {
  return (
    <div className="fixed inset-0 z-30 flex items-center justify-center text-background backdrop-blur font-mono">
      <div className="bg-black/80 p-8 md:p-20 lg:p-30 rounded-xl flex flex-col gap-4 items-center m-4">
        <p className="text-xl font-bold">Connecting...</p>
        <p className="text-lg">Please wait <span className="font-bold text-amber-500">30 to 60 seconds</span></p>
        <p className="text-xl">Time elapsed: <span className="font-bold text-accent">{seconds}s</span></p>
      </div>
    </div>
  )
}