import './panel.css';

type Props = {
    title?: string,
    children: React.ReactElement[] | React.ReactElement
}

const Panel = ({title, children}: Props) => {
    return (
        <div className="panel">
            {title && <p>{title}</p>}
            <>{children}</>
        </div>
    )
}

export default Panel;