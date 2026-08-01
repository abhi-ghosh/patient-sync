export default function TypeAnimation(){
  const delays=[0, 100, 200];
  return (
    <div className="flex gap-1">
      {delays.map((delay, index)=>(
        <div key={index} className="w-0.5 h-2 rounded-full bg-accent animate-bounce"
          style={{animationDelay: `${delay}ms`}}>
        </div>
      ))}
    </div>
  )
}