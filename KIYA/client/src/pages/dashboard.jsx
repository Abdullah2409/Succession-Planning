import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthContext from "../context/authcontext";
import Button from "../components/Button";
import PieChart from "../components/Pichart";
import CustomBarChart from "../components/Barchart";
import { backendUrl } from "../utils/backendurl";
const BACKEND_URL = backendUrl;

const ProfileCard = ({ user }) => {
  return (
    <div className="p-5 grid grid-rows-1 self-stretch border border-gray-300 bg-[#F7F7F7] rounded-lg">
      <div className="flex items-center justify-center mb-5">
        {user?.profilepicture ? (
          <img
            src={user.profilepicture}
            alt="Profile"
            className="w-32 aspect-square rounded-full object-cover shadow-md border-1 border-white "
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-gray-400" />
        )}
      </div>
      <div className="text-center">
        <div className="font-semibold mb-2">{user?.name}</div>
        <div className="text-gray-500">{user?.role}</div>
      </div>
      <div className="text-center mt-5">
        <Link
          to="/profile"
          className="px-4 py-2 text-slate-600 text-[.75rem] underline font-bold"
        >
          VIEW MORE
        </Link>
      </div>
    </div>
  );
};

const PendingTasks = ({ tasks }) => {
  const taskElements = tasks.map((task, index) => (
    <Link
      to={`/dashboard/task/${task._id}`}
      key={index}
      className="bg-primary p-3 rounded-[22px] flex justify-between items-center hover:opacity-80 transition duration-300 ease-in-out"
    >
      <span className="font-bold">{task.title}:</span>{" "}
      {task.description.slice(0, 20) + "..."}
    </Link>
  ));

  return (
    <div className="p-md bg-[#F7F7F7] col-span-3 self-stretch border border-gray-300 rounded-lg">
      <div className="flex flex-col gap-2 mb-5">
        <span className="font-bold">Pending Tasks</span>
        {taskElements}
      </div>
    </div>
  );
};

export const SpecificTask = () => {
  const { user } = useContext(AuthContext);
  const userRole = user?.role.toLowerCase();
  const { id } = useParams(); // task id
  const [task, setTask] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${BACKEND_URL}/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTask(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleTaskCompletion = () => {
    fetch(`${BACKEND_URL}/tasks/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isCompleted: true }),
    })
      .then((res) => res.json())
      .then((data) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="h-min p-md bg-[#F7F7F7] border border-gray-300 rounded-lg">
      <div className="flex flex-col gap-2">
        <span className="font-bold">Task Details</span>
        <div className="bg-primary p-3 rounded-[22px] flex justify-between items-center">
          <span className="font-bold">Title:</span>
          <span>{task.title}</span>
        </div>
        <div className="bg-primary p-3 rounded-[22px] flex justify-between">
          <span className="font-bold mr-2">Description:</span>
          <span>{task.description}</span>
        </div>
        <div className="bg-primary p-3 rounded-[22px] flex justify-between items-center">
          <span className="font-bold">Deadline:</span>
          <span>{task.deadline}</span>
        </div>
        <div className="bg-primary p-3 rounded-[22px] flex justify-between items-center">
          <span className="font-bold">Assigned by:</span>
          <span>{task.employerid}</span>
        </div>
        <div className="bg-primary p-3 rounded-[22px] flex justify-between items-center">
          <span className="font-bold">Assigned to:</span>
          <span>{task.employeeid}</span>
        </div>
        {userRole === "employee" && (
          <div className="bg-primary p-3 rounded-[22px] flex justify-between items-center">
            <span className="font-bold">Skills:</span>
            <span>
              {task?.skills?.map((skill, index) => {
                return (
                  <div key={index}>
                    {skill.name} - {skill.boost}
                  </div>
                );
              })}
            </span>
          </div>
        )}

        {userRole === "employee" && (
          <div className="flex justify-center mt-5">
            <div>
              <Button
                text="Mark as Completed"
                bg_clr="bg-secondary"
                font_size="text-[12px]"
                font_weight="font-semibold"
                px="px-[10px]"
                py="py-[10px]"
                onClick={handleTaskCompletion}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const FeedbackRequests = ({ user }) => {
  const createFeedbackRequestElements = () => {
    return user?.feedbackRequests.map((request, index) => (
      <div
        key={index}
        className="bg-primary p-3 rounded-[22px] flex justify-between items-center"
      >
        <div className="flex flex-col gap-3">
          <div className="font-bold">
            Employee Id:{" "}
            <span className="font-light">{request.employeeid}</span>{" "}
          </div>
          <div className="font-bold">
            Task: <span className="font-light">{request.taskTitle}</span>
          </div>
        </div>

        <Link
          to={`/employee-feedback/${request.employeeid}?feedbackRequestId=${request._id}`}
          className="bg-[#fec601] font-semibold rounded-3xl px-4 py-2 text-sm hover:opacity-80 transition duration-300 ease-in-out"
        >
          Give Feedback
        </Link>
      </div>
    ));
  };

  return (
    <div className="bg-[#F7F7F7] p-md col-span-2 grid grid-rows-1 self-stretch rounded-lg border border-gray-300">
      <div className="flex flex-col gap-2">
        <span className="font-bold mb-5">Requests for feedback</span>
        {createFeedbackRequestElements()}
      </div>
    </div>
  );
};

const AnalyticsDetails = ({ user }) => {
  const [employee, setEmployee] = useState(null);
  const [skillsData, setSkillsData] = useState([]);
  const navigate = useNavigate();

  const createBarCharts = () => {
    if (!employee || employee?.skills.length === 0) return "No data available";

    const subSkills = employee.skills.slice(0, 2);

    return subSkills.map((skill, index) => {
      const requiredSkill = skillsData.find((data) => data.name === skill.name);
      return (
        <CustomBarChart
          key={index}
          name={skill.name}
          current={skill.points}
          intermediate={requiredSkill?.levels.intermediate}
          advance={requiredSkill?.levels.advance}
          width={150}
        />
      );
    });
  };

  useEffect(() => {
    fetch(`${BACKEND_URL}/skills`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setSkillsData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    fetch(`${BACKEND_URL}/employees/${user?.employeeid}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmployee(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-[#F7F7F7] p-md col-span-2 grid grid-rows-1 self-stretch rounded-lg border border-gray-300">
      <div className="employee-details">
        <div className="flex justify-between items-center mb-5">
          <h2 className="font-semibold">Employee Development Statistics</h2>
          <Link
            to={`/advance-analytics/${user?.employeeid}`}
            className="px-4 py-2 text-slate-600 text-[.75rem] underline font-bold"
          >
            VIEW MORE
          </Link>
        </div>
        <div className="flex gap-5 flex-wrap ">{createBarCharts()}</div>
      </div>
    </div>
  );
};

const StatisticsChart = ({ user }) => {
  const userRole = user?.role.toLowerCase();
  const [tasks, setTasks] = useState([]);
  const pendingFeedbacksRequests = user?.feedbackRequests?.length;
  const pendingTasks = tasks.filter((task) => !task.isCompleted).length;
  const totalTasks = tasks.length;
  const totalTasksAndFeedbacks = tasks.length + pendingFeedbacksRequests;

  const employeePiChartData = [
    {
      name: "Pending Tasks",
      percentage: (pendingTasks / totalTasks) * 100,
    },
    {
      name: "Completed Tasks",
      percentage: ((totalTasks - pendingTasks) / totalTasks) * 100,
    },
  ];

  const employerPiChartData = [
    {
      name: "Pending Tasks",
      percentage: (pendingTasks / totalTasksAndFeedbacks) * 100,
    },
    {
      name: "Completed Tasks",
      percentage:
        ((tasks.length - pendingTasks) / totalTasksAndFeedbacks) * 100,
    },
    {
      name: "Pending Feedback Requests",
      percentage: (pendingFeedbacksRequests / totalTasksAndFeedbacks) * 100,
    },
    // {
    //   name: "Other Responsibilities",
    //   percentage:
    //     100 -
    //     ((pendingTasks / totalTasksAndFeedbacks) * 100 +
    //       ((tasks.length - pendingTasks) / totalTasksAndFeedbacks) * 100 +
    //       (pendingFeedbacksRequests / totalTasksAndFeedbacks) * 100),
    // },
  ];

  useEffect(() => {
    fetch(`${BACKEND_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(
          data.filter((task) =>
            userRole === "employer"
              ? task.employerid === user?.id
              : task.employeeid === user?.id
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-[#F7F7F7] col-span-2 p-md rounded-lg grid grid-rows-1 self-stretch border border-gray-300">
      <div className="flex flex-col gap-5 justify-center items-center text-[12px]">
        <div className="font-bold text-base">Tasks Statistics</div>
        <PieChart
          data={
            userRole === "employer" ? employerPiChartData : employeePiChartData
          }
          width={300}
          height={300}
        />
      </div>
    </div>
  );
};

export default function Dashboard() {
  const { user, setUser } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const userRole = user?.role?.toLowerCase();

  useEffect(() => {
    fetch(`${BACKEND_URL}/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks(
          data.filter(
            (task) =>
              !task.isCompleted &&
              (userRole === "employer"
                ? task.employerid === user?.id
                : task.employeeid === user?.id)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fetch updated user data
  useEffect(() => {
    fetch(`${BACKEND_URL}/${userRole}s/${user?.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUser((prev) => ({ ...prev, ...data }));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="p-lg flex flex-col md:grid auto-rows-min items-center grid-cols-1 md:grid-cols-4 gap-4">
      <ProfileCard user={user} />
      <PendingTasks tasks={tasks} />
      {userRole === "employer" ? (
        <FeedbackRequests user={user} />
      ) : (
        <AnalyticsDetails user={user} />
      )}
      <StatisticsChart user={user} />
    </div>
  );
}
