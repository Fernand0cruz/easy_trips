interface TripHeaderProps {
    location: string;
    maxGuests: number;
}

const TripHeader = ({location, maxGuests}: TripHeaderProps) => {
    return (
        <div className="my-5">
            <h1 className="uppercase font-bold">{location}</h1>
        </div>
    );
}

export default TripHeader;