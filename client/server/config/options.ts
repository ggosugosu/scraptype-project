import fs from 'fs';
import hi from '../../'

const configPath = `/Users/gosugosu/Documents/projects/tagtype-project/client/server/config/config.json`;
// @ts-ignore
const options = JSON.parse(fs.readFileSync(configPath, "UTF-8"));

export default options;


