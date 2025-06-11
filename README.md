# Enov8 Send Instance Info GitHub Action

This GitHub Action sends version and resource name to the Enov8 SystemInstance API.

## 📥 Inputs

| Name           | Required | Description                      |
|----------------|----------|----------------------------------|
| `version`      | Yes      | System version (e.g. `17.14`)    |
| `resource_name`| Yes      | Resource name (e.g. `GDW (DEV)`) |
| `user_id`      | Yes      | Enov8 user ID                    |
| `app_id`       | Yes      | Enov8 app ID                     |
| `app_key`      | Yes      | Enov8 app key                    |

## 🚀 Usage

```yaml
- name: Send info to Enov8
  uses: your-org/enov8-send-instance@v1
  with:
    version: "17.14"
    resource_name: "GDW (DEV)"
    user_id: ${{ secrets.ENOV8_USER_ID }}
    app_id: ${{ secrets.ENOV8_APP_ID }}
    app_key: ${{ secrets.ENOV8_APP_KEY }}
```

## 🛡 License

[MIT](LICENSE)