## Como rodar o projeto

```bash
git clone <url-do-repo>
cd <pasta-do-projeto>
npm install
copy .env.example .env
npx prisma db push
npx prisma generate
npm run dev
```

Se alguém alterar o `prisma/schema.prisma`, rode `npx prisma db push` e `npx prisma generate` de novo.