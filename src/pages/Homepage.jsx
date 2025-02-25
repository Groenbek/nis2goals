import React, { useState } from "react";

const questions = [
  {
    category: "Organisatorisk beredskab",
    text: "Har jeres virksomhed identificeret, om den er omfattet af NIS2-direktivet?",
    options: ["Ja", "Nej", "Ved ikke"],
  },
  {
    category: "Organisatorisk beredskab",
    text: "Har I en ansvarlig person (f.eks. en CISO eller compliance officer) for NIS2-implementering?",
    options: ["Ja", "Nej"],
  },
  {
    category: "Organisatorisk beredskab",
    text: "Har I en dokumenteret strategi for cybersikkerhed og risikostyring?",
    options: ["Ja", "Nej", "Delvist"],
  },
  {
    category: "Teknisk sikkerhed & beskyttelse",
    text: "Har I implementeret en incident response plan for cyberhændelser?",
    options: ["Ja", "Nej"],
  },
  {
    category: "Teknisk sikkerhed & beskyttelse",
    text: "Udfører I regelmæssige sikkerhedstest eller penetrationstests af jeres systemer?",
    options: ["Ja", "Nej", "Sjældent"],
  },
  {
    category: "Teknisk sikkerhed & beskyttelse",
    text: "Anvender I MFA (Multi-Factor Authentication) på kritiske systemer?",
    options: ["Ja", "Nej", "På nogle systemer"],
  },
  {
    category: "Leverandørstyring & compliance",
    text: "Har I identificeret jeres kritiske leverandører og vurderet deres sikkerhedsniveau?",
    options: ["Ja", "Nej"],
  },
  {
    category: "Leverandørstyring & compliance",
    text: "Har I en leverandørkontrakt, der stiller krav til cybersikkerhed?",
    options: ["Ja", "Nej", "Delvist"],
  },
  {
    category: "Rapportering & hændelseshåndtering",
    text: "Ved jeres medarbejdere, hvordan de skal rapportere en sikkerhedshændelse?",
    options: ["Ja", "Nej", "Delvist"],
  },
  {
    category: "Rapportering & hændelseshåndtering",
    text: "Har I en plan for at rapportere cyberhændelser til relevante myndigheder (fx CFCS eller Erhvervsstyrelsen)?",
    options: ["Ja", "Nej", "Ved ikke"],
  },
];

const NIS2Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [questions[currentQuestion].text]: answer });
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    const yesAnswers = Object.values(answers).filter((ans) => ans === "Ja").length;
    if (yesAnswers <= 4) return "🚨 Høj risiko! I har sandsynligvis behov for en dybere gennemgang af jeres NIS2-compliance.";
    if (yesAnswers <= 7) return "⚠️ Delvist compliant – der er områder, der bør forbedres.";
    return "✅ Godt på vej! I har allerede en stærk NIS2-strategi, men kan stadig have blinde vinkler.";
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {!showResult ? (
        <div className="p-6 w-96 text-center border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">{questions[currentQuestion].category}</h2>
          <p className="text-lg mb-4">{questions[currentQuestion].text}</p>
          <div className="flex flex-col space-y-2">
            {questions[currentQuestion].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 transition"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-6 w-96 text-center border border-gray-300 rounded-lg shadow-lg">
          <h2 className="text-xl font-bold mb-4">Resultat & Opfølgning</h2>
          <p className="text-lg mb-4">{calculateScore()}</p>
          <p className="mt-4">Vil I have en mere detaljeret vurdering? Kontakt os for en uforpligtende samtale om, hvordan vi kan hjælpe!</p>
        </div>
      )}
    </div>
  );
};

const Homepage = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-4">Homepage</h1>
      <NIS2Questionnaire />
    </div>
  );
};

export default Homepage;