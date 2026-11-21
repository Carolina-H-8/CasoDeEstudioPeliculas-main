export default function InfoCard({name,amount,children}){
    return(
        <div className="w-34 h-14 px-4 py-2 flex items-center gap-2 bg-Neutral rounded-lg">
            {children}
            <div className="font-Jakarta">
                <h3 className="text-Neutral-50/60 uppercase text-[12px]">{name}</h3>
                <p className="text-Neutral-50 font-bold">{amount}</p>
            </div>
        </div>
    )
}