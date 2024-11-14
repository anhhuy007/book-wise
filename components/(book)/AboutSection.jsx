import React from "react";
import { Button } from "@/components/ui/button";

function AboutSection() {
  return (
    <div>
      <section className="grid gap-6 md:grid-cols-[200px,1fr] p-0 xl:pr-52">
        <h2 className="text-2xl font-bold">About</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">About the author</h3>
            <p className="text-muted-foreground">
              HUGH HOWEY is the author of the award-winning Molly Fyde saga and
              the <span className="italic">New York Times</span> and{" "}
              <span className="italic">USA Today</span> best-selling Wool
              series. The <span className="italic">Wool Omnibus</span> won{" "}
              <span className="italic">Kindle Book Review&apos;s</span> 2012
              Indie Book of the Year Award and has been translated in forty
              countries.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Details</h3>
            <dl className="grid grid-cols-[auto,1fr] gap-x-4">
              <dt className="font-medium">PUBLICATION</dt>
              <dd className="text-muted-foreground">
                Boston : Houghton Mifflin Harcourt, 2017.
              </dd>
            </dl>
            <Button variant="link" className="mt-2 h-auto p-0">
              Full details ›
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutSection;
