import './SidebarButton.css'

interface Props {
  title: string
  imgUrl: string
}

export const SidebarButton = ({title, imgUrl}: Props) => {
  return (
    <button className="sidebar-button">
      <img src={imgUrl} alt={title} />
      <span>{title}</span>
    </button>
  )
}