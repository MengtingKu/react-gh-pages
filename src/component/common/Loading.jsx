function Loading({ status }) {
    if (! status) return null;

    return (
        <>
            <div className="loading">
                <div className="bounceBall me-2"></div>
                <div className="text h5">NOW LOADING...ʕ̯•͡ˑ͓•̯᷅ʔ</div>
            </div>
        </>
    );
}

export default Loading;
