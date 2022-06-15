type MusicSectionProps = {
    headerText: string;
    sectionId: string;
    tracks: JSX.Element[]
}

export function MusicSection(props: MusicSectionProps): JSX.Element {
    const { headerText, sectionId, tracks } = props;
    return (
        <>
            <h2 className="music-head">{headerText}</h2>
            <section className="tracks" id={sectionId}>
                {tracks}
            </section>
        </>
    )
}