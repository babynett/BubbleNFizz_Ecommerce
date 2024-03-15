import "flowbite";
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require("./components/Example");

require("./page/Dashboard");

require('./auth/EditProfile');

require("./page/UserManagement/Employees/EmployeesAccounts");
require("./page/UserManagement/Employees/AddEmployee");
require("./page/UserManagement/Customers/CustomerAccounts");
require("./page/UserManagement/Customers/AddCustomer");
require('./page/Admin/CashDrawer/PaymentRegister')

require("./page/Customer/CustomerPoll")

require('./page/Shopping/ShoppingPage')
require('./page/Shopping/AllProductsPage')
require('./page/Shopping/BubbleBathPage')
require('./page/Shopping/ProductPage')
require('./page/Shopping/Cart/Cart')
require('./page/Shopping/Cart/Checkout')

require('./page/Admin/OrdersManagement/OrdersManagement')

require('./page/Admin/ProductsManagement/ProductsManagement')

require('./page/Admin/ReportsManagement/AnalyticsBoard')