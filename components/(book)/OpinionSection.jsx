import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

function OpinionSection() {
  return (
    <>
      <section className="grid gap-6 md:grid-cols-[200px,1fr] p-0 xl:pr-52">
        <h2 className="text-2xl font-bold">Opinion</h2>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">From the critics</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Library Journal Reviews</h4>
                <p className="text-muted-foreground">
                  This debut short story collection from the author of Wool and
                  Beacon 23 explores topics as vast as the universe and as
                  focused as artificial intelligence. A number of these 21
                  selections have been previously published, such as...{" "}
                  <Button variant="link" className="h-auto p-0">
                    Read more ›
                  </Button>
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Publishers Weekly Reviews</h4>
                <p className="text-muted-foreground">
                  Bestseller Howey (the Silo trilogy) assembles 21 thoughtful
                  science fiction and fantasy stories (two previously
                  unpublished) that explore real and virtual worlds through
                  human, alien, and artificial senses. Many of Howey&apos;s
                  tales, such...{" "}
                  <Button variant="link" className="h-auto p-0">
                    Read more ›
                  </Button>
                </p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">From the community</h3>
            <Card>
              <CardContent className="p-6">
                <h4 className="font-medium mb-4">
                  What did you think about this title?
                </h4>
                <Textarea
                  placeholder="Add comment"
                  className="min-h-[100px] mb-4"
                />
                <Button>Submit</Button>
              </CardContent>
            </Card>
            <p className="text-muted-foreground text-sm mt-4 italic">
              There are no comments from the community on this title
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default OpinionSection;
