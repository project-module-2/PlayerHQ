const PopularUser = ({
    text='User',
    href='',
    disabled=false
    })=>(
    <li class="list-group-item bg-transparent">
    <a href={href} disabled={disabled}>{text}</a>
    </li>
)

export default PopularUser