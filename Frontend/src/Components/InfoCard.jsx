export default function InfoCard({name,amount,imgUrl}){
    return(
        <div className="w-34 h-14 px-4 py-2 flex items-center gap-2 bg-Neutral rounded-lg">
            <img className="w-8 h-8" src={imgUrl} alt="Media icon" />
            <div className="font-Jakarta">
                <h3 className="text-Neutral-50/60 uppercase text-[12px]">{name}</h3>
                <p className="text-Neutral-50 font-bold">{amount}</p>
            </div>
        </div>
    )
}