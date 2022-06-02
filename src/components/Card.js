const Card = ({card}) => {
    const {
        title,
        desc,
        type,
        start,
        end,
        image
    } = card

    return (
        <div className="card">
            <h2>{title}</h2>
            <p>{desc}</p>
            <p>{type}</p>
            <p>{start}</p>
            <p>{end}</p>
            <p>{image}</p>
        </div>
      );
}