import React, { useState } from "react";
import styled from "styled-components";

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

const Container = styled.div`
  font-family: Arial, sans-serif;
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  background: linear-gradient(135deg, #f6d365 0%, #fda085 100%);
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const QuestionContainer = styled.div`
  margin-bottom: 20px;
`;

const QuestionHeader = styled.h2`
  font-size: 1.5em;
  color: #333;
`;

const QuestionText = styled.p`
  font-size: 1.2em;
  color: #666;
`;

const Button = styled.button`
  background-color: ${(props) => (props.red ? "#dc3545" : props.white ? "white" : "green")};
  color: ${(props) => (props.white ? "black" : "white")};
  border: ${(props) => (props.white ? "1px solid black" : "none")};
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;

  &:hover {
    background-color: ${(props) => (props.red ? "#c82333" : props.white ? "#f0f0f0" : "green")};
  }
`;

const ResultHeader = styled.h2`
  font-size: 1.5em;
  color: #333;
`;

const ResultText = styled.p`
  font-size: 1.2em;
  color: #666;
`;

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
    <Container>
      {!showResult ? (
        <QuestionContainer>
          <div>Spørgsmål {currentQuestion + 1}/{questions.length}</div>
          <QuestionHeader>{questions[currentQuestion].category}</QuestionHeader>
          <QuestionText>{questions[currentQuestion].text}</QuestionText>
          <div>
            {questions[currentQuestion].options.map((option) => (
              <Button key={option} red={option === "Nej"} white={option === "Ved ikke"} onClick={() => handleAnswer(option)}>
                {option}
              </Button>
            ))}
          </div>
        </QuestionContainer>
      ) : (
        <QuestionContainer>
          <ResultHeader>Resultat & Opfølgning</ResultHeader>
          <ResultText>{calculateScore()}</ResultText>
          <ResultText>Vil I have en mere detaljeret vurdering? Kontakt os for en uforpligtende samtale om, hvordan vi kan hjælpe!</ResultText>
        </QuestionContainer>
      )}
    </Container>
  );
};

const Homepage = () => {
  return (
    <Container>
      <h1>NIS2 Compliance Tjek</h1>
      <NIS2Questionnaire />
    </Container>
  );
};

export default Homepage;