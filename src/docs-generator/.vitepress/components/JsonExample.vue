<script setup lang="ts">

</script>

<template>
  <table>
    <tbody>
    <tr>
      <td> <pre>/</pre> </td>
      <td> <pre>/customers</pre> </td>
    </tr>

    <tr style="vertical-align:top">
      <td>
<pre class="json-table">
{
  "_links": {
    "self: {
      "href": "/"
    },
    "customers": {
      "href": "/customers"
    },
    "orders": {
      "href": "/orders"
    }
  }
}
</pre>
      </td>

      <td style="width: 100%">
<pre class="json-table">
{
  "_items": [
    {
      "membershipId": "A375",
      "givenName": "Pat",
      "familyName": "Smith",
      "active": true,
      "_links": {
        "self": {
          "href": "/customers/A375",
        },
        "edit-form": {
          "href": "/customers/A375/edit-form",
        },
        "orders": {
          "href": "/customers/A375/orders",
        },
        "deactivate": {
          "href": "/customers/A375/deactivate",
          "_note": "PUT to deactivate"
        }
      }
    },
    {
      "membershipId": "R933",
      "givenName": "Darcy",
      "familyName": "Jones",
      "active": false,
      "_links": {
        "self": {
          "href": "/customers/R933",
        },
        "edit-form": {
          "href": "/customers/R933/edit-form",
        },
        "orders": {
          "href": "/customers/R933/orders",
        },
        "activate": {
          "href": "/customers/R933/activate",
          "_note": "PUT to activate"
        }
      }
    },
    ...
    ...
    ...
  ],
  "_links": {
    "self": {
      "href": "/customers"
    },
    "item": {
      "href": "/customers/{membershipId}",
      "templated": true
    },
    "create-form": {
      "href": "/customers/create-form",
    }
  }
}</pre>
      </td>
    </tr>
    </tbody>
  </table>

  <table>
    <tbody>
    <tr>
      <td> <pre>/customers/A375</pre> </td> <td> <pre>/customers/A375/orders</pre> </td>
    </tr>
    <tr style="vertical-align:top">
      <td>
<pre class="json-table">
{
  "membershipId": "A375",
  "givenName": "Pat",
  "familyName": "Smith",
  "active": true,
  "_links": {
    "self": {
      "href": "/customers/A375",
    },
    "edit-form": {
      "href": "/customers/A375/edit-form",
    },
    "orders": {
      "href": "/customers/A375/orders",
    },
    "deactivate": {
      "href": "/customers/A375/deactivate",
      "_note": "PUT to deactivate this member"
    }
  }
}
</pre>
      </td>
      <td style="width: 100%">
<pre class="json-table">
{
  "_items": [
    {
      "orderNumber": "FK9384",
      "partNumber": "009343-12",
      "quantity": 3,
      "_customer_ref": "A375",
      "_links": {
        "self": {
          "href": "/orders/65fd80549561b2884948c312",
        },
        "edit-form": {
          "href": "/orders/65fd80549561b2884948c312/edit-form",
        },
        "parent": {
          "href": "/customers/A375",
        },
        "collection": {
          "href": "/customers/A375/orders"
        }
      }
    },
    ...
    ...
    ...
  ],
  "_links": {
    "self": {
      "href": "/customers/A375/orders"
    },
    "item": {
      "href": "/orders/{id}",
      "templated": true
    },
    "create-form": {
      "href": "/customers/A375/create-form",
    }
  }
}</pre>
      </td>

    </tr>
    </tbody>
  </table>
</template>

<style>
pre.json-table {
  line-height: 1.2;
}

</style>