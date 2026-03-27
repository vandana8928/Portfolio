import { personal } from '../data'

function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-white/10 py-8 text-center text-xs text-[#888899]">
      All Rights Reserved. {personal.name} © {year}
    </footer>
  )
}

export default Footer