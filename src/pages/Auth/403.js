import "./403.css";
export default function Err403(){
    return(
        <div className="text-wrapper">
            <div className="title" data-content={404}>
                403 - ACCESS DENIEN
            </div>
            <div className="subtitlee">
               oops you dont have permission to access this page .
            </div>

        </div>
    )
}