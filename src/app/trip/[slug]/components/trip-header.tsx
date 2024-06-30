interface TripHeaderProps {
    location: string;
}

const TripHeader = ({location}: TripHeaderProps) => {
    return (
        <div>
            <h1 className="uppercase font-bold">{location}</h1>
        </div>
    );
}

export default TripHeader;