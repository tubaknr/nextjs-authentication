import { getTrainings } from "@/lib/training"

export default async function TrainingPage() {
    const trainingSessions = getTrainings();

    return(
        <main>
            <h1>Find your favrite activity</h1>
            <ul id="training-sessions">
                {trainingSessions.map((training) => (
                    <li key={training.id}>
                        <img src={`/trainings/${training.iamge}`} alt={training.title} />
                    
                        <div>
                            <h2>{training.title}</h2>
                            <p>{training.description}</p>
                        </div>
                    </li>
                ))}
                
            </ul>

        </main>
    )
}