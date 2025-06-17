import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Title from "./components/title";

function TaskPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const title = searchParams.get("title")
    const description = searchParams.get("description")
    return <div className="h-screen w-screen bg-slate-500 p-6">
        <div className="w-[500px] space-y-4">
            <div className="flex justify-center relative mb-6">
                <button 
                    onClick={() => navigate(-1)} 
                    className="absolute p-2 rounded-md left-0  text-slate-700 bg-slate-100"
                >
                    <ChevronLeftIcon />
                </button>
                <Title>Detalhes da Tarefa</Title>
            </div>

            <div className="bg-slate-200 p-4 rounded-md">
                <h2 className="text-xl  font-bold text-slate-600">{title}</h2>
                <p className="text-slate-600 ">{description}</p>
            </div>   
        </div>
    </div>;
}

export default TaskPage;