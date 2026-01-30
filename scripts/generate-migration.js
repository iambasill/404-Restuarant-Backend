const { execSync } = require('child_process');

const args = process.argv.slice(2);
const nameArg = args.find(arg => arg.startsWith('--name='));

if (!nameArg) {
  console.error(' Error: Migration name is required!');
  console.log('Usage: npm run migration:generate -- --name=YourMigrationName');
  process.exit(1);
}

const migrationName = nameArg.split('=')[1];

if (!migrationName || migrationName.trim() === '') {
  console.error(' Error: Migration name cannot be empty!');
  process.exit(1);
}

console.log(' Building project...');
execSync('npm run build', { stdio: 'inherit' });

console.log(` Generating migration: ${migrationName}...`);
const command = `typeorm -d dist/database/data.source.js migration:generate ./src/database/migrations/${migrationName}`;

try {
  execSync(command, { stdio: 'inherit' });
  console.log(` Migration generated successfully!`);
} catch (error) {
  console.error(' Failed to generate migration');
  process.exit(1);
}