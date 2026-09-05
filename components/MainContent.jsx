import {User,Monitor} from "lucide-react";
export default function MainContent({whichForm, setWhichForm, children}){
  const style = "max-h-screen scrollbar-thin scrollbar-thumb-accent overflow-y-auto border-r-2 border-border px-8 py-8"
  const [PatientPanel,StaffPanel] = children;
  return (
    <div className="w-full h-full">
      {/*//* Mobile View */}
      <div className="block lg:hidden">
        <div className="bg-secondary text-muted-foreground font-bold flex justify-center items-center">
          <button className={`flex gap-2 flex-1 justify-center p-4 items-center border-b-2
            ${whichForm ==="patient" ? "text-accent border-b-accent" : "border-b-secondary"}`}
            onClick={()=>setWhichForm("patient")}>
            <User/>Patient Form
          </button>
          <button className={`flex gap-2 flex-1 justify-center p-4 items-center border-b-2
            ${whichForm ==="staff" ? "text-accent border-b-accent" : "border-b-secondary"}`}
            onClick={()=>setWhichForm("staff")}>
            <Monitor/>Staff Monitor
          </button>
        </div>
        <div className="px-6 py-8">
          {whichForm === "patient" ? PatientPanel : StaffPanel}
        </div>
      </div>

      {/*//* Desktop View */}
      <div className="hidden lg:grid lg:grid-cols-2">
        <div className= {style}
        >
          {PatientPanel}
        </div>

        <div className= {style}>
          {StaffPanel}
        </div>
      </div>
    </div>
  )
}