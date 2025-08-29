import {useState, useEffect} from 'react'
import {useParams, useNavigate} from "react-router-dom"
import axios from 'axios';
import ThemeInput from "./ThemeInput.jsx";
import LoadingStatus from "./LoadingStatus.jsx";
import {API_BASE_URL} from "../util.js";

function StoryGenerator(){
    const navigate = useNavigate();
    const [theme, setTheme] = useState("");
    const [jobId, setJobId] = useState(null);
    const [jobStatus, setJobStatus] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        let pollInterval;

        if (jobId && jobStatus === "processing") {
            pollInterval = setInterval(() => {
                pollJobStatus(jobId);
            }, 5000); // Poll every 5 seconds
        }

        return () => {
            if (pollInterval) {
                clearInterval(pollInterval);
            }
        }
    }, [jobId, jobStatus])

    const generateStory = async (theme) => {
        setLoading(true)
        setError(null)
        setTheme(theme)

        try {
            const response = await axios.post(`${API_BASE_URL}/stories/create`, {theme})
            const {job_id, status} = response.data
            setJobId(job_id)
            setJobStatus(status)

            pollJobStatus(job_id)
        } catch (e) {
            setLoading(false)
            setError(`Ocorreu um erro ao criar a sua história: ${e.message}`)
        }
    }

    const pollJobStatus = async (id) => {
        try {
            const response = await axios.get(`${API_BASE_URL}/jobs/${id}`)
            const {status, story_id, error: jobError} = response.data
            setJobStatus(status);

            if (status === "completed" && story_id) {
                fetchStory(story_id)
            } else if (status === "failed" || jobError) {
                setError(jobError || "A geração da história falhou. Por favor, tenta novamente.")
                setLoading(false);
            }
        } catch (e) {
            if (e.response?.status !== 404) {
                setError(`Ocorreu um erro ao verificar a sua história: ${e.message}`)
                setLoading(false);
            }
        }
    }

    const fetchStory = async (id) => {
        try {
            setLoading(false)
            setJobStatus("completed")
            navigate(`/story/${id}`)

        } catch (e) {
            setError(`Falha ao carregar a história: ${e.message}`)
            setLoading(false)
        }
    }

    const reset = () => {
        setJobId(null);
        setJobStatus(null);
        setError(null);
        setTheme("")
        setLoading(false)
    }

    return <div className="story-generator">
        {error && <div className="error-message">
            <p>{error}</p>
            <button onClick={reset}>Tenta Novamente</button>
        </div>}

        {!jobId && !error && !loading && <ThemeInput onSubmit={generateStory} />}

        {loading && <LoadingStatus theme={theme} />}
    </div>
}

export default StoryGenerator;

