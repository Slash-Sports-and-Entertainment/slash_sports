"use client";
import type { JSX } from "react";
import { teamData } from "@/app/data/teams";
import { TeamCards } from "@/app/lib/components/TeamCards";

export default function MeetTeam(): JSX.Element {
  return(
    <section id="meet-team">
      <div id="meet-team-wrapper" className="wrapper">
        <h1>
          <span className="outline-text">
            MEET OUR
          </span> TEAM
        </h1>
        <div id="team-cards-container">
          {teamData.map((person) => {
            return(
              <article 
                className="team-cards" 
                key={person.id}
              >
                <TeamCards person={person} />
              </article>
            )
            })}
        </div>
      </div>
    </section>
  )
}