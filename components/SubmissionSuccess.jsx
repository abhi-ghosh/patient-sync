import { CircleCheck } from "lucide-react";

export default function SubmissionSuccess({resetForm}) {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-6 py-12 text-center">
      <div className="mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-green-100 dark:bg-green-950/30">
        <CircleCheck className="h-14 w-14 text-green-600" strokeWidth={2.5} />
      </div>
      <h1 className="text-3xl font-bold text-foreground md:text-4xl">
        Registration Complete
      </h1>
      {/* Description */}
      <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">
        Your information has been submitted successfully.
        <br />
        A member of our staff will be with you shortly.
      </p>
      {/* Button */}
      <button
        className="mt-10 w-full max-w-xs rounded-xl bg-accent px-6 py-4
        text-lg font-bold text-white transition-all duration-200 hover:brightness-110 active:scale-95"
        onClick={resetForm}
      >
        Start New Registration
      </button>
    </div>
  );
}