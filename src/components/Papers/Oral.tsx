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
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    setFocus(Array(card.length).fill(false));
  }, [card]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("http://localhost:3000/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const { data } = await res.json();
      setCard(data.paperPage[0].section3.card);
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const index = focus.findIndex((f) => f === true);
      if (index !== -1 && card.length > index) {
        const selectedCardId = card[index].id;
        try {
          const res = await fetch("http://localhost:3000/api/graphql", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              query: query2,
            }),
          });
          const { data } = await res.json();
          data.host[0].section1.editorCards.forEach((card) => {
            if (card.name === selectedCardId) {
              setSelectedCard(card);
            }
          });
        } catch (error) {
          console.error("Fetch error: ", error);
        }
      }
    }
    fetchData();
  }, [focus, card]);

  return (
    <div className="flex flex-1 flex-col justify-start max-w-[976px]">
      <div className="text-16M text-primary">Oral Presentation Sessions</div>
      <div className="relative w-fit">
        <div className="text-black text-48M relative z-10">口頭發表場次</div>
        <div className="z-0 transform translate-y-[-20px] w-full h-[28px] bg-gradient-to-r from-[#FFC76C] to-[#FFC76C00] rounded-full" />
      </div>
      <div className="mt-[64px] grid grid-cols-4 gap-[32px]">
        {card.map((item, index) => (
          <div
            key={index}
            className={`p-[24px] rounded-[24px] w-[220px] transition-all ease-in-out duration-500 ${
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
      <PeopleCard card={selectedCard} />
      <div className="mt-[64px] rounded-[40px] bg-[#F4F7FD]">
        <PDFViewer src="口頭發表" />
      </div>
    </div>
  );
};
