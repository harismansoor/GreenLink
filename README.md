# Final Year Project

## GreenLink

GreenLink stands as a pioneering web platform revolutionizing transparency and sustainability in organic food supply chains through blockchain technology. By meticulously documenting each step of the supply chain journey, GreenLink ensures accountability and traceability, effectively combatting issues like fraud and unreliable certifications. GreenLink simplifies operations, instils consumer confidence, and promotes environmental sustainability. Moreover, it streamlines the supply chain, benefiting organic farmers and reducing complexity. Looking ahead, GreenLink can potentially drive positive change and foster a more sustainable future for all stakeholders involved. By leveraging blockchain and smart contract technology, GreenLink opens a new era of trust, efficiency, and responsibility in the global food industry.

# Workflow

![GreenLink (2)](https://github.com/user-attachments/assets/1ca7c89d-5fd4-4550-a583-29bfcd0202d0)


# Accolades

Acknowledged as a complete and innovative solution to the problem statement.
Received special mention from supervisor.

@Haris Mansoor
----------------------------------------------------

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
