export default {
  items: [
    {
      name: "پنل ادمین",
      url: "/dashboard",
      icon: "icon-speedometer",
      badge: {
        variant: "info",
        text: "منو",
      },
      class: "font-weight-bold",
    },

    {
      name: "پست ها",
      icon: "icon-grid",
      class: "font-weight-bold",

      children: [
        {
          name: "پست های خام",
          url: "/posts/rawposts",
          icon: "icon-bag",
        },
        {
          name: "پست های تایید شده",
          url: "/posts/acceptedposts",
          icon: "icon-basket-loaded",
        },
      ],
    },
    {
      divider: true,
    },

    {
      name: "برندها",
      icon: "icon-rocket",
      class: "font-weight-bold",

      children: [
        {
          name: "ایجاد برند جدید",
          url: "/brand/new",
          icon: "icon-badge",
        },
        {
          name: " لیست برندها",
          url: "/brand/list",
          icon: "icon-list",
        },
      ],
    },
    {
      divider: true,
    },
    {
      name: "فروشندگان",
      icon: "icon-people",
      class: "font-weight-bold",

      children: [
        {
          name: "ایجاد فروشنده",
          url: "/merchant/new",
          icon: "icon-user-follow",
        },
        {
          name: " لیست فروشنده ها",
          url: "/merchant/list",
          icon: "icon-list",
        },
      ],
    },
    {
      divider: true,
    },
    {
      name: "دسته بندی ها",
      icon: "icon-drawer",
      class: "font-weight-bold",

      children: [
        {
          name: "ایجاد دسته بندی",
          url: "/category/new",
          icon: "icon-pencil",
        },
        {
          name: " لیست دسته بندی ها",
          url: "/category/list",
          icon: "icon-list",
        },
      ],
    },
  ],
};
