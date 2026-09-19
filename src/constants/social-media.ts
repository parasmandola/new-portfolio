import { FileText, Github, Linkedin, Mail } from "lucide-react";
import { TbBrandLeetcode } from "react-icons/tb";

export const SOCIAL_MEDIA_HANDLES = [
  {
    name: "Github",
    url: "https://github.com/parasmandola/",
    icon: Github,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/paras-mandola/",
    icon: Linkedin,
  },
  {
    name: "Email",
    url: "mailto:parasmandola73@gmail.com",
    icon: Mail,
  },
  {
    name: "Resume",
    url: "https://drive.google.com/file/d/1nNbwtRomnqg0EE_xDw02PGwdgX80u2pA/view?usp=drive_link",
    icon: FileText
  },
  {
    name: "LeetCode",
    url: "https://leetcode.com/u/parasmandola/",
    icon: TbBrandLeetcode
  }
];