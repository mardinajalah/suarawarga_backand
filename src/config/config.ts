import dotenv from "dotenv"

dotenv.config()

interface ConfigType {
  port: number;
}

const config: ConfigType = {
  port: Number(process.env.POTR) || 3000
}

export default config