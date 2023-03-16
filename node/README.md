```
curl -fsSL https://bun.sh/install | bash
curl -fsSL https://deno.land/x/install/install.sh | sh
nvm use 18
```

```
bun run node/index.js               # breaks - streams not implemented, at least decompress
node node/index.js
deno run --allow-net node/index.js 
```
