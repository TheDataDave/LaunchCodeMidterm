export default function Loading({ label }) {
    return (
        <div className="text-center">
            <p>{label}</p>
            <div className="spinner-border" role="status">
                <span className="sr-only"></span>
            </div>
        </div>
    )
}