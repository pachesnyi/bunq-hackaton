### Dashboard for portfolio analyzer

## Main rules

1. Use link to figma file to analyze and create similar design https://www.figma.com/design/M8hLRezYAd6KVuqd9ZM5Zq/Bunq-Free-UI-Kit---By-Marvilo--Community-?node-id=16002-3265&t=sDyveGSuFYR2ygA6-0
2. Use Angular material components and create customer styles when needed
3. Use grid.scss classes and container class for main block on the page
4. Use app/shared/mocks/api.mock.ts as example for response

## Sections

1. Portfolio details which we get from API.
2. Chart with current assets
3. Chat which user can use to interact with agent
4. For the first time instead of chat we need to show questionarie based on what we will adjust risk profile for user
   Something like:
5. Do you have experience with trading? (no exp, 1 year, active investor, long-term-investor)
6. Are you interesting in investing in: (multiselect) crypto, stocks, bonds, I don't have experience with trading
   ... generate more questions which can be useful
