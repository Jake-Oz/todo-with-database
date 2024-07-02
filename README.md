# Frontend Mentor - Todo app solution

This is a solution to the [Todo app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/todo-app-Su1_KokOW). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Add new todos to the list
- Mark todos as complete
- Delete todos from the list
- Filter by all/active/complete todos
- Clear all completed todos
- Toggle light and dark mode
- **Bonus**: Drag and drop to reorder items on the list

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: https://github.com/Jake-Oz/todo-with-database
- Live Site URL: https://todo-with-database.vercel.app

## My process

### Built with

- [React](https://reactjs.org/) - JS library
- [Next.js](https://nextjs.org/) - React framework
- [Tailwind](https://tailwindcss.com/) - For styles
- [Shadcn](https://ui.shadcn.com) - For some components
- [Framer Motion](https://www.framer.com/motion/reorder/) - For the Todo Re-order animation
- [Auth.js](https://authjs.dev) - For User Authorisation
- [Prisma](https://www.prisma.io) - Database ORM (PostGres DB Used)
- [Resend](https://resend.com) - To generate magic link email login option

### What I learned

For this project I used Jira to help plan and track project progress. I also learned a lot about Framer Motion and how it can be used easily for animations.
I probably spent most of my time getting the auth.js package working using magic links. I used "resend.com" to enable the email verification which was free and simple to use.

The code below shows the main section with the new Todo Input component and the TODOs inside the Framer Motion Reorder.Group. The Framer Motion Docs helped quite a bit but I found YouTube to be really helpful with examples.

```jsx
<main className="w-full ">
  <InputCard className="mb-5" refreshTodos={refreshTodos} user={user} />

  <div className="">
    <Reorder.Group
      axis="y"
      values={cards}
      onReorder={setCards}
      className="rounded-t-md shadow-2xl bg-neutral-white dark:bg-dark-theme-very-dark-desaturated-blue"
    >
      {cards
        .filter((card) =>
          filter === "all"
            ? card
            : filter === "active"
            ? card.active
            : !card.active
        )
        .map((card) => (
          <Reorder.Item
            key={card.id}
            value={card}
            initial={{ opacity: 0, overflow: "hidden" }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            whileDrag={{
              scale: 1.1,
              opacity: 0.8,
              boxShadow: "4px 4px 10px lightgray",
              borderRadius: "16px",
              overflow: "visible",
            }}
            className="first:rounded-t-md bg-neutral-white dark:bg-dark-theme-very-dark-gray border-b  border-neutral-very-light-grayish-blue dark:border-dark-theme-very-dark-grayish-blue"
          >
            <Card
              className="dark:bg-dark-theme-very-dark-desaturated-blue"
              {...card}
              updateStatus={handleActiveUpdate}
              deleteTodo={deleteTodo}
            />
          </Reorder.Item>
        ))}
    </Reorder.Group>

    <div className="shadow-2xl flex justify-between items-center bg-neutral-white h-11 p-6 text-sm  text-neutral-dark-grayish-blue dark:text-dark-theme-very-dark-grayish-blue rounded-b-lg dark:bg-dark-theme-very-dark-desaturated-blue">
      <div className="w-full flex justify-between items-center">
        <p className="">
          {cards.filter((item) => item.active).length} item
          <span
            className={cn("hidden", {
              inline: cards.filter((item) => item.active).length > 1,
            })}
          >
            s
          </span> left
        </p>
        <div className="hidden sm:block">
          <Filters filter={filter} setFilter={setFilter} />
        </div>

        <button
          onClick={clearCompletedItems}
          className="  hover:text-neutral-very-dark-grayish-blue dark:hover:text-neutral-light-grayish-blue"
        >
          Clear Completed
        </button>
      </div>
    </div>
  </div>
  <div className="sm:hidden bg-neutral-white dark:bg-dark-theme-very-dark-desaturated-blue rounded h-11 mt-4 w-full">
    <Filters filter={filter} setFilter={setFilter} />
  </div>

  <p className="flex items-center justify-center mt-12 text-neutral-dark-grayish-blue text-sm">
    Drag and Drop to Reorder List
  </p>
</main>
```

### Continued development

I still need to work on my planning for apps. I still feel my seperation of concerns is not yet ideal. In addition, I need to learn more about using Server Components and Server Actions so that I can better optimise app performance.

## Author

- Frontend Mentor - [@Jake-Oz](https://www.frontendmentor.io/profile/Jake-Oz)
