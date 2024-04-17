import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AnalyticsDetails from "./Analytics/analytics_details";
import AuthContext from "../context/authcontext";
const BACKEND_URL = "http://localhost:8000";

export default function AdvanceAnalytics() {
  const { user } = useContext(AuthContext);
  const [programs, setPrograms] = useState([]);
  console.log(programs);
  console.log(user?.trainingPrograms);

  const recommendedPrograms = programs.filter((program) => {
    return !user?.trainingPrograms.some((trainingProgram) => {
      return trainingProgram.id === program._id;
    });
  });

  const trainingProgramsElement = recommendedPrograms.map((program, index) => {
    return (
      <Link
        to={`/dashboard/task/${program._id}`}
        key={index}
        className="bg-primary p-3 rounded-[22px] flex justify-between items-center hover:opacity-80 transition duration-300 ease-in-out"
      >
        <span className="font-bold">{program.name}:</span>{" "}
        {program.description.slice(0, 20) + "..."}
        <div>
          {program.skills.map((skill, index) => {
            return (
              <span key={index} className="text-sm font-semibold">
                {skill.name}
              </span>
            );
          })}
        </div>
      </Link>
    );
  });

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/programs`);
        const data = await response.json();
        setPrograms(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPrograms();
  }, []);

  return (
    <div>
      <section>
        <AnalyticsDetails user={user} />
      </section>
      <section>
        <h2>Recommended Training Programs</h2>
        <ul>{trainingProgramsElement}</ul>
      </section>
    </div>
  );
}
