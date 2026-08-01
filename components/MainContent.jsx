import {User,Monitor} from "lucide-react";
export default function MainContent({whichForm, setWhichForm, children}){
  const [PatientPanel,StaffPanel] = children;
  return (
    <div className="w-full h-full">
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
      <div className="hidden lg:grid lg:grid-cols-2">
        <div className="max-h-screen overflow-y-auto border-r-2 border-border px-8 py-8">
          {PatientPanel}
        </div>

        <div className="max-h-screen overflow-y-auto px-8 py-8">
          {StaffPanel}
        </div>
      </div>
    </div>
  )
}