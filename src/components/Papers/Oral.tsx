"use client";
import { useState, useEffect } from "react";
import { PeopleCard } from "@/components/Speech/PeopleCard";
import { PDFViewer } from "@/components/Papers/PDFViewer";

const query = `
  query paperPage {
    paperPage {
      section3
    }
  }
`;

const query2 = `
  query host {
    host {
      section1
    }
  }
`;

export const Oral = () => {
  const [card, setCard] = useState([]);
  const [focus, setFocus] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const [hostData, setHostData] = useState([]);

  useEffect(() => {
    setFocus(Array(card.length).fill(false));
  }, [card]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      const cards = data.paperPage[0].section3.card.map((card: any) => ({
        ...card,
        people: card.people || [],
        files: card.files || [],
      }));
      setCard(cards);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchHostData() {
      try {
        const res = await fetch("/api/graphql", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: query2 }),
        });
        const { data } = await res.json();
        setHostData(data.host[0].section1.editorCards);
      } catch (error) {
        console.error("Fetch error: ", error);
      }
    }
    fetchHostData();
  }, []);

  useEffect(() => {
    const index = focus.findIndex((f) => f === true);
    setSelectedCardIndex(index);
    if (index !== -1 && card.length > index && card[index].people) {
      const selectedPeople = card[index].people;
      const matchedCards = selectedPeople
        .map((person: any) => {
          return hostData.find((host: any) => host.name === person.name);
        })
        .filter(Boolean);
      setSelectedCards(matchedCards);
    } else {
      setSelectedCards([]);
    }
  }, [focus, card, hostData]);

  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]  px-3 desktop:px-0">
      <div className="text-16M text-primary">Oral Presentation Sessions</div>
      <div className="relative w-fit">
        <div className="text-black text-48M relative z-10">口頭發表場次</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>
      <div className="mt-[64px] grid grid-cols-2 desktop:grid-cols-4 gap-[32px]">
        {card.map((item, index) => (
          <div
            key={index}
            className={`p-[24px] rounded-[24px] desktop:w-[220px] w-[150px] transition-all ease-in-out duration-500 ${
              focus[index] ? "bg-third" : "bg-[#F4F7FD]"
            }`}
            onClick={() =>
              setFocus((prev) => prev.map((f, i) => (i === index ? !f : false)))
            }
          >
            <div
              className={`text-16M transition-all ease-in-out duration-500 ${
                focus[index] ? "text-white" : "text-[#252F38B2]"
              }`}
            >
              {item.title}
            </div>
            <div
              className={`mt-[8px] text-16M transition-all ease-in-out duration-500 ${
                focus[index] ? "text-white" : "text-[#252F38B2]"
              }`}
            >
              {item.content}
            </div>
          </div>
        ))}
      </div>
      {selectedCards.length > 0 && (
        <div className="mt-[64px]">
          {selectedCards.map((personCard, index) => (
            <div key={index} className="mb-[32px]">
              <PeopleCard card={personCard} />
            </div>
          ))}
        </div>
      )}
      {selectedCardIndex !== null &&
        card[selectedCardIndex] &&
        card[selectedCardIndex].files &&
        card[selectedCardIndex].files.length > 0 && (
          <div className="mt-[64px]">
            {card[selectedCardIndex].files.map((file: any, index: number) => (
              <div key={index} className="mb-[32px] rounded-[40px] bg-[#F4F7FD]">
                <div className="text-20M p-4">{file.name}</div>
                <PDFViewer src={file.url} />
              </div>
            ))}
          </div>
        )}
    </div>
  );
};
