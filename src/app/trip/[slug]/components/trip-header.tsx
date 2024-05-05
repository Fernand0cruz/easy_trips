interface TripHeaderProps {
    location: string;
    maxGuests: number;
}

const TripHeader = ({location, maxGuests}: TripHeaderProps) => {
    return (
        <div className="my-5">
            <h1 className="uppercase font-bold">{location}</h1>
            <p>Número máximo de pessoas: {maxGuests}</p>
        </div>
    );
}

export default TripHeader;