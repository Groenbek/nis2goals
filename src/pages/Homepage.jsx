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
    if (yesAnswers <= 4) return "Høj risiko! I har sandsynligvis behov for en dybere gennemgang af jeres NIS2-compliance.";
    if (yesAnswers <= 7) return "Delvist compliant – der er områder, der bør forbedres.";
    return "Godt på vej! I har allerede en stærk NIS2-strategi, men kan stadig have blinde vinkler.";
  };

  return (
    <div>
      {!showResult ? (
        <>
          <div>Spørgsmål {currentQuestion + 1}/{questions.length}</div>
          <h2>{questions[currentQuestion].category}</h2>
          <p>{questions[currentQuestion].text}</p>
          <div>
            {questions[currentQuestion].options.map((option) => (
              <button key={option} onClick={() => handleAnswer(option)}>
                {option}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2>Resultat & Opfølgning</h2>
          <p>{calculateScore()}</p>
          <p>Vil I have en mere detaljeret vurdering? Kontakt os for en uforpligtende samtale om, hvordan vi kan hjælpe!</p>
        </>
      )}
    </div>
  );
};

const Homepage = () => {
  return (
    <div>
      <h1>NIS2 Compliance Tjek</h1>
      <NIS2Questionnaire />
    </div>
  );
};

export default Homepage;
