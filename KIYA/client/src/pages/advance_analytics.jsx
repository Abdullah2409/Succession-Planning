/* import { useContext, useState, useEffect } from "react";
import AnalyticsDetails from "./Analytics/analytics_details";
import AuthContext from "../context/authcontext";
import Button from "../components/Button";
const BACKEND_URL = "http://localhost:8000";

export default function AdvanceAnalytics() {
  const { user, setUser } = useContext(AuthContext);
  const [programs, setPrograms] = useState([]);

  const recommendedPrograms = programs.filter((program) => {
    return !user?.trainingPrograms.some((trainingProgram) => {
      return trainingProgram.id === program._id;
    });
  });

  const trainingProgramsElement = recommendedPrograms.map((program, index) => {
    return (
      <div
        key={index}
        className="bg-primary p-3 mb-2 rounded-[22px] flex justify-between items-center"
      >
        <span className="font-bold">{program.name}:</span>{" "}
        {program.description.slice(0, 20) + "..."}
        <Button
          text="Start Program"
          bg_clr="bg-secondary"
          font_size="text-[12px]"
          font_weight="font-semibold"
          px="px-[10px]"
          py="py-[10px]"
          onClick={() => handleStartProgram(program._id)}
        />
      </div>
    );
  });

  let inProgressPrograms = user?.trainingPrograms.filter((trainingProgram) => {
    return trainingProgram.status === "inprogress";
  });

  inProgressPrograms = programs.filter((program) => {
    return inProgressPrograms.some((trainingProgram) => {
      return trainingProgram.id === program._id;
    });
  });

  const inProgressProgramsElement = inProgressPrograms.map((program, index) => {
    return (
      <div
        key={index}
        className="bg-primary p-3 mb-2 rounded-[22px] flex justify-between items-center"
      >
        <span className="font-bold">{program.name}:</span>{" "}
        {program.description.slice(0, 20) + "..."}
        <Button
          text="Mark As Completed"
          bg_clr="bg-secondary"
          font_size="text-[12px]"
          font_weight="font-semibold"
          px="px-[10px]"
          py="py-[10px]"
          onClick={() => handleProgramCompletion(program._id)}
        />
      </div>
    );
  });

  const handleStartProgram = async (programId) => {
    user?.trainingPrograms.push({ id: programId, status: "inprogress" });
    try {
      const response = await fetch(`${BACKEND_URL}/employees/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setUser({ ...user, ...data });
    } catch (error) {
      console.error(error);
    }
  };

  const handleProgramCompletion = async (programId) => {
    user.trainingPrograms = user?.trainingPrograms.map((trainingProgram) => {
      if (trainingProgram.id === programId) {
        trainingProgram.status = "completed";
      }

      return trainingProgram;
    });

    // update the user's skills
    const program = programs.find((program) => program._id === programId);
    program.skills.forEach((skill) => {
      const userSkill = user.skills.find(
        (userSkill) => userSkill.name === skill.name
      );
      if (userSkill) {
        userSkill.points += skill.boost;
      } else {
        user.skills.push({
          name: skill.name,
          points: skill.boost,
          level: "beginner",
        });
      }
    });

    try {
      const response = await fetch(`${BACKEND_URL}/employees/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setUser({ ...user, ...data });
    } catch (error) {
      console.error(error);
    }
  };

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
        <h2 className="font-semibold">Recommended Training Programs</h2>
        <ul>{trainingProgramsElement}</ul>
        <h2 className="font-semibold">Inprogress Training Programs</h2>
        <ul>{inProgressProgramsElement}</ul>
      </section>
    </div>
  );
}
 */

import React, { useContext, useState, useEffect } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import AnalyticsDetails from "./Analytics/analytics_details";
import AuthContext from "../context/authcontext";
import Button from "../components/Button";
const BACKEND_URL = "http://localhost:8000";

export default function AdvanceAnalytics() {
  const { user, setUser } = useContext(AuthContext);
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingProgram, setUpdatingProgram] = useState(false);

  const recommendedPrograms = programs.filter((program) => {
    return !user?.trainingPrograms.some((trainingProgram) => {
      return trainingProgram.id === program._id;
    });
  });

  const trainingProgramsElement = recommendedPrograms.map((program, index) => {
    return (
      <div
        key={index}
        className="bg-primary p-3 mb-2 rounded-[22px] flex justify-between items-center"
      >
        <span className="font-bold">{program.name}:</span>{" "}
        {program.description.slice(0, 20) + "..."}
        <Button
          text="Start Program"
          bg_clr="bg-secondary"
          font_size="text-[12px]"
          font_weight="font-semibold"
          px="px-[10px]"
          py="py-[10px]"
          disabled={updatingProgram}
          onClick={() => handleStartProgram(program._id)}
        />
      </div>
    );
  });

  let inProgressPrograms = user?.trainingPrograms.filter((trainingProgram) => {
    return trainingProgram.status === "inprogress";
  });

  inProgressPrograms = programs.filter((program) => {
    return inProgressPrograms.some((trainingProgram) => {
      return trainingProgram.id === program._id;
    });
  });

  const inProgressProgramsElement = inProgressPrograms.map((program, index) => {
    return (
      <div
        key={index}
        className="bg-primary p-3 mb-2 rounded-[22px] flex justify-between items-center"
      >
        <span className="font-bold">{program.name}:</span>{" "}
        {program.description.slice(0, 20) + "..."}
        <Button
          text="Mark As Completed"
          bg_clr="bg-secondary"
          font_size="text-[12px]"
          font_weight="font-semibold"
          px="px-[10px]"
          py="py-[10px]"
          disabled={updatingProgram}
          onClick={() => handleProgramCompletion(program._id)}
        />
      </div>
    );
  });

  const handleStartProgram = async (programId) => {
    setUpdatingProgram(true);
    user?.trainingPrograms.push({ id: programId, status: "inprogress" });
    try {
      const response = await fetch(`${BACKEND_URL}/employees/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setUser({ ...user, ...data });
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingProgram(false);
    }
  };

  const handleProgramCompletion = async (programId) => {
    setUpdatingProgram(true);
    user.trainingPrograms = user?.trainingPrograms.map((trainingProgram) => {
      if (trainingProgram.id === programId) {
        trainingProgram.status = "completed";
      }

      return trainingProgram;
    });

    // update the user's skills
    const program = programs.find((program) => program._id === programId);
    program.skills.forEach((skill) => {
      const userSkill = user.skills.find(
        (userSkill) => userSkill.name === skill.name
      );
      if (userSkill) {
        userSkill.points += skill.boost;
      } else {
        user.skills.push({
          name: skill.name,
          points: skill.boost,
          level: "beginner",
        });
      }
    });

    try {
      const response = await fetch(`${BACKEND_URL}/employees/${user._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      setUser({ ...user, ...data });
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingProgram(false);
    }
  };

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const response = await fetch(`${BACKEND_URL}/programs`);
        const data = await response.json();
        setPrograms(data);
        setLoading(false);
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
        <h2 className="font-semibold">Recommended Training Programs</h2>
        {loading ? <CircularProgress /> : <ul>{trainingProgramsElement}</ul>}
        <h2 className="font-semibold">Inprogress Training Programs</h2>
        <ul>
          {inProgressPrograms.length > 0
            ? inProgressProgramsElement
            : "No inprogress programs"}
        </ul>
      </section>
    </div>
  );
}
