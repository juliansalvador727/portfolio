import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <main>
        <div className="space-y-1">
          <p>hi, my name is julian. </p>
          <p>currently, i'm... </p>
          <ul className="list-disc list-inside">
            <li>a computer engineering student @ uwaterloo</li>
            <li>building fullstack for satellites @ uw orbital</li>
          </ul>
          <p>in the past i...</p>
          <ul className="list-disc list-inside">
            <li>taught stem @ sfu applied sciences</li>
            <li>won 2 piano concerto competitions @ vayalive</li>
            <li>colored satoru gojo with math in desmos</li>
          </ul>
        </div>

        <Button className="mt-8" variant="outline">
          check out my projects
        </Button>
      </main>
    </>
  );
}
